import { Request, Response } from 'express';
import FollowService from '../services/follow.service';

export const addFollow = async (req: any, res: Response) => {
  try {
    const { followingId } = req.body;
    const followerId = req.user.id;
    await FollowService.addFollow({ follower_id: Number(followerId), following_id: Number(followingId) });
    res.status(201).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, searchKey = '', orderBy = "asc", sortBy = "date" } = req.query;
    const followers = await FollowService.getFollowers({ userId: Number(userId), limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy) });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, searchKey = '', sortBy = 'date', orderBy = 'asc' } = req.query;
    const following = await FollowService.getFollowing({ userId: Number(userId), limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy) });
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  try {
    const { followingId } = req.params;
    const followerId = req.user.id;
    await FollowService.unfollowUser({ follower_id: Number(followerId), following_id: Number(followingId) });
    res.status(201).send({ message: "Unfollowed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
